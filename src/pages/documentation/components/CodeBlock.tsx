import { Checkmark, Copy } from '@carbon/icons-react'
import { Highlight, themes, type Language } from 'prism-react-renderer'
import JavaPrism from 'prismjs'
import 'prismjs/components/prism-java'
import { useEffect, useState } from 'react'
import { uiContent } from '../../../data/uiContent'
import { createTextId } from '../../../utils/markdown'
import './CodeBlock.css'

interface CodeBlockProps {
  code: string
  languageName: string
}

const copyFeedbackDuration = 1800

const languagesByName: Record<string, Language> = {
  cpp: 'cpp',
  java: 'java',
  javascript: 'javascript',
  js: 'javascript',
  typescript: 'typescript',
  ts: 'typescript',
  tsx: 'tsx',
  css: 'css',
  bash: 'bash',
  json: 'json',
}

export default function CodeBlock({ code, languageName }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (!isCopied) return
    const timeout = window.setTimeout(() => setIsCopied(false), copyFeedbackDuration)
    return () => window.clearTimeout(timeout)
  }, [isCopied])

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
    } catch {
      setIsCopied(false)
    }
  }

  return (
    <div className="code-block">
      <div className="code-block__toolbar">
        <span>{languageName || uiContent.defaultLanguage}</span>
        <button type="button" onClick={copyCode}>
          {isCopied ? <Checkmark size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          {isCopied ? uiContent.copiedCode : uiContent.copyCode}
        </button>
        <span className="code-block__status" role="status">
          {isCopied ? uiContent.copiedCode : ''}
        </span>
      </div>
      <Highlight prism={languageName === 'java' ? JavaPrism : undefined} theme={themes.vsDark} code={code} language={languagesByName[languageName] ?? 'markup'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} code-block__pre`} style={style} tabIndex={0}>
            {tokens.map((line, lineIndex) => (
              <div key={createTextId(`${lineIndex}-${line.map((token) => token.content).join('')}`)} {...getLineProps({ line })}>
                {line.map((token, tokenIndex) => (
                  <span key={createTextId(`${tokenIndex}-${token.content}`)} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
