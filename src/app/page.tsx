"use client"
import QRCode from "qrcode.react"
import { useRef, useState } from "react"

const Page = () => {
  const [url, setUrl] = useState<string>('')
  const [color, setColor] = useState<string>('#000000')
  const qrRef = useRef<HTMLDivElement>(null)

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas')

    if (canvas) {
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = 'qrcode.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <div className="flex flex-col items-center mt-12 px-3">
      <h1 className="text-3xl font-bold mb-6 text-center">URL to QR Code Generator</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        className="p-2 border border-gray-300 rounded w-full max-w-xs mb-4 outline-none"
      />
      <div className="flex flex-col items-center mt-6 mb-6">
        <label htmlFor="color" className="block mb-2 text-lg font-semibold text-gray-700">Select Color:</label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-12 h-12 border rounded-lg shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div ref={qrRef} className="mb-4">
        {url && <QRCode value={url} size={256} fgColor={color} />}
      </div>
      {url && (
        <button
          onClick={downloadQRCode}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download QR Code
        </button>
      )}
    </div>
  )
}

export default Page
