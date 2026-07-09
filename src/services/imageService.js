import imageCompression from 'browser-image-compression'

// ===========================
// Cloudinary Configuration
// ===========================
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

// ===========================
// Image Compression
// ===========================

/**
 * Compress an image file before upload.
 * Reduces file size significantly while maintaining visual quality.
 *
 * @param {File} file - The original image file.
 * @param {Object} options - Compression options.
 * @param {number} [options.maxSizeMB=0.5] - Maximum output file size in MB.
 * @param {number} [options.maxWidthOrHeight=1920] - Max width or height in pixels.
 * @returns {Promise<File>} - The compressed image file.
 */
export async function compressImage(file, options = {}) {
  const {
    maxSizeMB = 0.5,
    maxWidthOrHeight = 1920,
  } = options

  // Skip compression for already small files (< 100KB)
  if (file.size < 100 * 1024) {
    return file
  }

  const compressionOptions = {
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker: true,
    fileType: 'image/webp', // Convert to WebP for best compression
    initialQuality: 0.8,
  }

  try {
    const compressedFile = await imageCompression(file, compressionOptions)
    console.log(
      `Compressed: ${(file.size / 1024).toFixed(0)}KB → ${(compressedFile.size / 1024).toFixed(0)}KB ` +
      `(${((1 - compressedFile.size / file.size) * 100).toFixed(0)}% reduction)`
    )
    return compressedFile
  } catch (error) {
    console.warn('Image compression failed, using original file:', error)
    return file
  }
}

// ===========================
// Cloudinary Upload
// ===========================

/**
 * Upload an image to Cloudinary using unsigned upload preset.
 * Automatically compresses the image before uploading.
 *
 * @param {File} file - The image file to upload.
 * @param {Object} options - Upload options.
 * @param {string} [options.folder='general'] - Cloudinary folder to upload into.
 * @param {boolean} [options.compress=true] - Whether to compress before upload.
 * @param {function} [options.onProgress] - Progress callback: (percentage) => void
 * @returns {Promise<Object>} - { url, publicId, width, height, format, bytes }
 */
export async function uploadImage(file, options = {}) {
  const {
    folder = 'general',
    compress = true,
    onProgress,
  } = options

  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      'Cloudinary configuration missing. ' +
      'Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file.'
    )
  }

  // Step 1: Compress the image
  let processedFile = file
  if (compress) {
    processedFile = await compressImage(file)
  }

  // Step 2: Upload to Cloudinary
  const formData = new FormData()
  formData.append('file', processedFile)
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('folder', `fitjeeva/${folder}`)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentage = Math.round((e.loaded / e.total) * 100)
          onProgress(percentage)
        }
      })
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText)
        resolve({
          url: response.secure_url,
          publicId: response.public_id,
          width: response.width,
          height: response.height,
          format: response.format,
          bytes: response.bytes,
        })
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.responseText}`))
      }
    })

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed — network error'))
    })

    xhr.open('POST', CLOUDINARY_URL)
    xhr.send(formData)
  })
}

/**
 * Get an optimized Cloudinary URL with transformations.
 * Use this to serve images in the best format and size for the user's device.
 *
 * @param {string} url - The original Cloudinary URL.
 * @param {Object} options - Transformation options.
 * @param {number} [options.width] - Desired width.
 * @param {number} [options.height] - Desired height.
 * @param {string} [options.crop='fill'] - Crop mode: 'fill', 'fit', 'scale', 'thumb'.
 * @param {string} [options.quality='auto'] - Quality: 'auto', 'auto:low', 'auto:good', 'auto:best'.
 * @param {string} [options.format='auto'] - Format: 'auto' (serves WebP/AVIF when supported).
 * @returns {string} - Transformed Cloudinary URL.
 */
export function getOptimizedUrl(url, options = {}) {
  if (!url || !url.includes('cloudinary.com')) {
    return url // Return as-is if not a Cloudinary URL
  }

  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = options

  // Build transformation string
  const transforms = [`q_${quality}`, `f_${format}`]
  if (width) transforms.push(`w_${width}`)
  if (height) transforms.push(`h_${height}`)
  if (width || height) transforms.push(`c_${crop}`)

  const transformString = transforms.join(',')

  // Insert transformations into Cloudinary URL
  // URL format: https://res.cloudinary.com/{cloud}/image/upload/{transforms}/{path}
  return url.replace('/image/upload/', `/image/upload/${transformString}/`)
}

/**
 * Delete an image from Cloudinary.
 * Note: Unsigned presets can't delete. This is a placeholder for admin cleanup.
 * For now, log the publicId — actual deletion can be done from Cloudinary dashboard.
 *
 * @param {string} publicId - The Cloudinary public ID of the image.
 */
export async function deleteImage(publicId) {
  // Cloudinary unsigned uploads don't support deletion via client-side API.
  // Two options for cleanup:
  // 1. Use Cloudinary Media Library dashboard to manually delete
  // 2. Set up a Netlify Function for secure server-side deletion (future enhancement)
  console.info(
    `Image marked for deletion: ${publicId}. ` +
    `Delete manually from Cloudinary dashboard or set up a server-side function.`
  )
}
