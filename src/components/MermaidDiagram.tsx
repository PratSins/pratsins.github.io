import React, { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  themeVariables: {
    darkMode: true,
    background: "#121418",
    primaryColor: "#1e222a",
    primaryTextColor: "#f1f5f9",
    primaryBorderColor: "#3b4252",
    lineColor: "#64748b",
    secondaryColor: "#181b22",
    tertiaryColor: "#14161d",
    actorBkg: "#1e222a",
    actorBorder: "#3b4252",
    actorTextColor: "#f1f5f9",
    signalColor: "#60a5fa",
    signalTextColor: "#e2e8f0",
    labelTextColor: "#f1f5f9",
    edgeLabelBackground: "#1e222a",
  },
})

interface MermaidDiagramProps {
  chart: string
  caption?: string
}

let diagramIdCounter = 0

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, caption }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const uniqueId = `mermaid-svg-${++diagramIdCounter}`

    async function renderChart() {
      try {
        const { svg: renderedSvg } = await mermaid.render(uniqueId, chart.trim())
        if (active) {
          setSvg(renderedSvg)
          setError(null)
        }
      } catch (err) {
        console.warn("Failed to render mermaid diagram:", err)
        if (active) {
          setError(err instanceof Error ? err.message : "Error rendering diagram")
        }
      }
    }

    renderChart()

    return () => {
      active = false
    }
  }, [chart])

  if (error || !svg) {
    return null
  }

  return (
    <figure className="detail__diagram-wrapper">
      <div
        ref={containerRef}
        className="detail__diagram"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption className="detail__diagram-caption">{caption}</figcaption>
      )}
    </figure>
  )
}
