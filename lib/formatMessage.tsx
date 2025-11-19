/**
 * Format message utility
 * Converts markdown-like syntax to JSX elements
 * Supports: **bold text**, line breaks
 */

import React from 'react'

export function formatMessage(text: string): React.ReactNode {
  if (!text) return null

  // Split by line breaks first
  const lines = text.split('\n')

  return lines.map((line, lineIndex) => {
    // Parse bold text **text** -> <strong>text</strong>
    const parts: React.ReactNode[] = []
    let currentText = line
    let partIndex = 0

    // Find all **text** patterns
    const boldRegex = /\*\*([^*]+)\*\*/g
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = boldRegex.exec(line)) !== null) {
      // Add text before bold
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lineIndex}-${partIndex++}`}>
            {line.substring(lastIndex, match.index)}
          </span>
        )
      }

      // Add bold text
      parts.push(
        <strong key={`bold-${lineIndex}-${partIndex++}`} className="font-bold">
          {match[1]}
        </strong>
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text after last bold
    if (lastIndex < line.length) {
      parts.push(
        <span key={`text-${lineIndex}-${partIndex++}`}>
          {line.substring(lastIndex)}
        </span>
      )
    }

    // Return line with or without line break
    if (lineIndex < lines.length - 1) {
      return (
        <React.Fragment key={`line-${lineIndex}`}>
          {parts.length > 0 ? parts : line}
          <br />
        </React.Fragment>
      )
    }

    return <React.Fragment key={`line-${lineIndex}`}>{parts.length > 0 ? parts : line}</React.Fragment>
  })
}

/**
 * Simple alternative: Convert to HTML string (for cases where JSX is not needed)
 */
export function formatMessageToHTML(text: string): string {
  if (!text) return ''

  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold">$1</strong>') // Bold
    .replace(/\n/g, '<br />') // Line breaks
}
