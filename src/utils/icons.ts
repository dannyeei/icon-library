import Iconify from '@purge-icons/generated'
import { getTransformedId, relumeSize, wfClassName } from '../store'
import Base64 from './base64'
import { HtmlToJSX } from './htmlToJsx'

const API_ENTRY = 'https://api.iconify.design'

export async function getSvg(icon: string, size: string | null = null, color = 'currentColor') {
    const width = size == null ? '100%' : size
    const height = size == null ? '100%' : size
    return Iconify.renderSVG(icon, { height, width })?.outerHTML?.replace('currentColor', color)
        || await fetch(`${API_ENTRY}/${icon}.svg?inline=false&height=${height}&width=${width}&color=${encodeURIComponent(color)}`).then(r => r.text()) || ''
}

export async function getSvgSymbol(icon: string, size = '1em', color = 'currentColor') {
    const svgMarkup = Iconify.renderSVG(icon, { height: size })?.outerHTML?.replace('currentColor', color)
        || await fetch(`${API_ENTRY}/${icon}.svg?inline=false&height=${size}&color=${encodeURIComponent(color)}`).then(r => r.text()) || ''

    const symbolElem = document.createElementNS('http://www.w3.org/2000/svg', 'symbol')
    const node = document.createElement('div') // Create any old element
    node.innerHTML = svgMarkup

    // Grab the inner HTML and move into a symbol element
    symbolElem.innerHTML = node.querySelector('svg')!.innerHTML
    symbolElem.setAttribute('viewBox', node.querySelector('svg')!.getAttribute('viewBox')!)
    symbolElem.id = icon.replace(/\:/, '-') // Simple slugify for quick symbol lookup

    return symbolElem?.outerHTML
}

export const iconVariants = [
    { className: 'icon-embed-xxsmall', text: 'Icon XXSmall (16px)', size: '1rem' },
    { className: 'icon-embed-xsmall', text: 'Icon XSmall (24px)', size: '1.5rem' },
    { className: 'icon-embed-small', text: 'Icon Small (32px)', size: '2rem' },
    { className: 'icon-embed-medium', text: 'Icon Medium (48px)', size: '3rem' },
    { className: 'icon-embed-large', text: 'Icon Large (80px)', size: '5rem' },
    { className: 'icon-embed-xlarge', text: 'Icon XLarge (104px)', size: '6.5rem' },
]

export async function getWebflowSvg(icon: string, className?: string) {
    const height = '100%'
    const width = '100%'
    const color = 'currentColor'

    if (!className)
        className = wfClassName.value
    const svgMarkup = Iconify.renderSVG(icon, { height, width })?.outerHTML
        || await fetch(`${API_ENTRY}/${icon}.svg?inline=false&height=${height}&width=${width}&color=${encodeURIComponent(color)}`).then(r => r.text()) || ''

    let size = null
    switch (className) {
        case 'icon-embed-xxsmall': size = '1rem'; break
        case 'icon-embed-xsmall': size = '1.5rem'; break
        case 'icon-embed-small': size = '2rem'; break
        case 'icon-embed-medium': size = '3rem'; break
        case 'icon-embed-large': size = '5rem'; break
        case 'icon-embed-xlarge': size = '6.5rem'; break
    }

    let n_id = null
    switch (className) {
        case 'icon-embed-xxsmall': n_id = '3fea695a-f02c-3b19-56a3-b64169d624f4'; break
        case 'icon-embed-xsmall': n_id = '3fea695a-f02c-3b19-56a3-b64169d624fc'; break
        case 'icon-embed-small': n_id = '3fea695a-f02c-3b19-56a3-b64169d62522'; break
        case 'icon-embed-medium': n_id = '3fea695a-f02c-3b19-56a3-b64169d624ec'; break
        case 'icon-embed-large': n_id = '6049af51-4e74-06b0-0171-1a89e622d0cf'; break
        case 'icon-embed-xlarge': n_id = '3fea695a-f02c-3b19-56a3-b64169d62532'; break
    }
    const styleLess = (size)
        ? `display: flex; width: ${size}; height: ${size}; flex-direction: column; justify-content: center; align-items: center;`
        : 'display: flex; flex-direction: column; justify-content: center; align-items: center; flex-grow: 0; flex-shrink: 0; flex-basis: auto;'

    return JSON.stringify({
        "type": "@webflow/XscpData",
        "payload": {
            "nodes": [{
                "_id": "1c91ce44-2c7a-3f78-f8c5-44fb8213f27c",
                "type": "HtmlEmbed",
                "tag": "div",
                "classes": [n_id],
                "children": [],
                v: svgMarkup,
                "data": {
                    "embed": {
                        "type": "html",
                        "meta": {
                            html: svgMarkup,
                            "div": false,
                            "iframe": false,
                            "script": false,
                            "compilable": false
                        }
                    },
                    "insideRTE": false,
                    "attr": {
                        "id": ""
                    },
                    "xattr": [],
                    "search": {
                        "exclude": false
                    },
                    "visibility": {
                        "conditions": []
                    }
                }
            }],
            "styles": [{
                "_id": n_id,
                "fake": false,
                "type": "class",
                "name": className,
                "namespace": "",
                "comb": "",
                styleLess,
                "variants": {},
                "children": [],
                "createdBy": "6075409192d886a671499223",
                "selector": null
            }],
            "assets": [],
            "ix1": [],
            "ix2": {
                "interactions": [],
                "events": [],
                "actionLists": []
            }
        },
        "meta": {
            "unlinkedSymbolCount": 0,
            "droppedLinks": 0,
            "dynBindRemovedCount": 0,
            "dynListBindRemovedCount": 0,
            "paginationRemovedCount": 0
        }
    });
}

export function toComponentName(icon: string) {
    return icon.split(/:|-|_/).filter(Boolean).map(s => s[0].toUpperCase() + s.slice(1).toLowerCase()).join('')
}

export function ClearSvg(svgCode: string) {
    const el = document.createElement('div')
    el.innerHTML = svgCode
    const svg = el.getElementsByTagName('svg')[0]
    const keep = ['viewBox', 'width', 'height', 'focusable', 'xmlns', 'xlink']
    for (const key of Object.values(svg.attributes)) {
        if (keep.includes(key.localName))
            continue
        svg.removeAttributeNode(key)
    }
    return HtmlToJSX(el.innerHTML)
}

export function SvgToJSX(svg: string, name: string, snippet: boolean) {
    const code = `
export function ${name}(props) {
  return (
    ${ClearSvg(svg).replace(/<svg (.*?)>/, '<svg $1 {...props}>')}
  )
}`
    if (snippet)
        return code
    else
        return `import React from 'react'\n${code}\nexport default ${name}`
}

export function SvgToTSX(svg: string, name: string, snippet: boolean) {
    const code = `
export function ${name}(props: SVGProps<SVGSVGElement>) {
  return (
    ${ClearSvg(svg).replace(/<svg (.*?)>/, '<svg $1 {...props}>')}
  )
}`
    if (snippet)
        return code
    else
        return `import React, { SVGProps } from 'react'\n${code}\nexport default ${name}`
}

export function SvgToVue(svg: string, name: string) {
    return `
<template>
  ${ClearSvg(svg)}
</template>

<script>
export default {
  name: '${name}'
}
</script>`
}

export function SvgToSvelte(svg: string) {
    return ClearSvg(svg)
}

export async function getIconSnippet(icon: string, type: string, snippet = true, color = 'currentColor', className?: string): Promise<string | undefined> {
    if (!icon)
        return

    let url = `${API_ENTRY}/${icon}.svg`
    if (color !== 'currentColor')
        url = `${url}?color=${encodeURIComponent(color)}`

    switch (type) {
        case 'id':
            return getTransformedId(icon)
        case 'url':
            return url
        case 'html':
            return `<span class="iconify" data-icon="${icon}" data-inline="false"${color === 'currentColor' ? '' : ` style="color: ${color}"`}></span>`
        case 'css':
            return `background: url('${url}') no-repeat center center / contain;`
        case 'svg':
            return await getSvg(icon, undefined, color)
        case 'svg-symbol':
            return await getSvgSymbol(icon, '32', color)
        case 'webflow-svg':
            return await getWebflowSvg(icon, className)
        case 'relume-svg':
            if (relumeSize.value === "1rem") {
                return await getSvg(icon, "16", color)
            } else if (relumeSize.value === "1.5rem") {
                return await getSvg(icon, "24", color)
            } else if (relumeSize.value === "2rem") {
                return await getSvg(icon, "32", color)
            } else if (relumeSize.value === "3rem") {
                return await getSvg(icon, "48", color)
            } else if (relumeSize.value === "5rem") {
                return await getSvg(icon, "80", color)
            } else if (relumeSize.value === "6.5rem") {
                return await getSvg(icon, "104", color)
            } else {
                return await getSvg(icon, "24", color)
            }
        case 'data_url':
            return `data:image/svg+xml;base64,${Base64.encode(await getSvg(icon, undefined, color))}`
        case 'pure-jsx':
            return ClearSvg(await getSvg(icon, undefined, color))
        case 'jsx':
            return SvgToJSX(await getSvg(icon, undefined, color), toComponentName(icon), snippet)
        case 'tsx':
            return SvgToTSX(await getSvg(icon, undefined, color), toComponentName(icon), snippet)
        case 'vue':
            return SvgToVue(await getSvg(icon, undefined, color), toComponentName(icon))
        case 'svelte':
            return SvgToSvelte(await getSvg(icon, undefined, color))
        case 'unplugin':
            return `import ${toComponentName(icon)} from '~icons/${icon.split(':')[0]}/${icon.split(':')[1]}'`
    }
}

export function getIconDownloadLink(icon: string) {
    return `${API_ENTRY}/${icon}.svg?download=true&inline=false&height=auto`
}
