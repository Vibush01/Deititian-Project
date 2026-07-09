import { useState, useRef, useCallback } from 'react'
import { uploadImage } from '../../services/imageService'
import { FaCloudUploadAlt, FaTrash, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

/**
 * Reusable image uploader component for the admin panel.
 * Supports drag-and-drop, click-to-browse, compression, upload progress, and preview.
 *
 * @param {Object} props
 * @param {string} [props.currentImage] - Currently saved image URL (for edit mode).
 * @param {string} [props.folder='general'] - Cloudinary folder for organizing uploads.
 * @param {function} props.onUpload - Called with the Cloudinary response object after successful upload.
 * @param {function} [props.onRemove] - Called when the user removes the current image.
 * @param {string} [props.label] - Label text above the uploader.
 * @param {string} [props.accept] - Accepted file types. Default: 'image/*'.
 * @param {string} [props.className] - Additional CSS classes.
 */
const ImageUploader = ({
  currentImage = '',
  folder = 'general',
  onUpload,
  onRemove,
  label = 'Upload Image',
  accept = 'image/*',
  className = '',
}) => {
  const [preview, setPreview] = useState(currentImage || '')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('') // 'compressing' | 'uploading' | 'done' | 'error'
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      setStatus('error')
      return
    }

    // File size check (max 10MB before compression)
    if (file.size > 10 * 1024 * 1024) {
      setError('File too large. Maximum size is 10MB.')
      setStatus('error')
      return
    }

    setError('')
    setUploading(true)
    setProgress(0)

    // Show local preview immediately
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(file)

    try {
      // Compression phase
      setStatus('compressing')

      // Upload phase (compression happens inside uploadImage)
      setStatus('uploading')
      const result = await uploadImage(file, {
        folder,
        compress: true,
        onProgress: (pct) => setProgress(pct),
      })

      setStatus('done')
      setPreview(result.url)
      if (onUpload) onUpload(result)

      // Reset status after a brief success indication
      setTimeout(() => setStatus(''), 2000)
    } catch (err) {
      console.error('Upload failed:', err)
      setError(err.message || 'Upload failed. Please try again.')
      setStatus('error')
      setPreview(currentImage || '')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }, [folder, onUpload, currentImage])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer?.files?.[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleInputChange = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    // Reset input so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [handleFile])

  const handleRemove = useCallback(() => {
    setPreview('')
    setError('')
    setStatus('')
    if (onRemove) onRemove()
  }, [onRemove])

  const handleClick = useCallback(() => {
    if (!uploading) fileInputRef.current?.click()
  }, [uploading])

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Preview + Upload Area */}
      {preview ? (
        /* -- Image Preview State -- */
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />

          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleClick}
              disabled={uploading}
              className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Replace
            </button>
            {onRemove && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                <FaTrash className="inline mr-1" /> Remove
              </button>
            )}
          </div>

          {/* Upload progress overlay */}
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
              <FaSpinner className="text-white text-2xl animate-spin mb-2" />
              <span className="text-white text-sm font-semibold">
                {status === 'compressing' ? 'Compressing...' : `Uploading ${progress}%`}
              </span>
              {status === 'uploading' && (
                <div className="w-3/4 bg-white/20 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-white h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Success checkmark */}
          {status === 'done' && !uploading && (
            <div className="absolute top-2 right-2">
              <FaCheckCircle className="text-green-500 text-xl drop-shadow-md" />
            </div>
          )}
        </div>
      ) : (
        /* -- Empty Drop Zone State -- */
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative flex flex-col items-center justify-center
            w-full h-48 rounded-xl border-2 border-dashed cursor-pointer
            transition-all duration-200
            ${dragOver
              ? 'border-[#2E7D32] bg-[#E8F5E9]'
              : 'border-gray-300 bg-gray-50 hover:border-[#2E7D32]/50 hover:bg-[#E8F5E9]/30'
            }
            ${uploading ? 'pointer-events-none opacity-70' : ''}
          `}
        >
          {uploading ? (
            <>
              <FaSpinner className="text-[#2E7D32] text-3xl animate-spin mb-3" />
              <span className="text-sm font-semibold text-gray-600">
                {status === 'compressing' ? 'Compressing image...' : `Uploading... ${progress}%`}
              </span>
              {status === 'uploading' && (
                <div className="w-3/4 bg-gray-200 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-[#2E7D32] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <FaCloudUploadAlt className={`text-3xl mb-3 ${dragOver ? 'text-[#2E7D32]' : 'text-gray-400'}`} />
              <span className="text-sm font-semibold text-gray-600">
                {dragOver ? 'Drop image here' : 'Drag & drop or click to upload'}
              </span>
              <span className="text-xs text-gray-400 mt-1">
                PNG, JPG, WebP • Max 10MB
              </span>
            </>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
          <FaExclamationTriangle className="text-xs shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  )
}

export default ImageUploader
