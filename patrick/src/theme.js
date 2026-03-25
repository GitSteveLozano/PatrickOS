import { useState, useEffect } from 'react'
export const T = {
  bg:"#09090F", surface:"#0F1019", surfaceHigh:"#161824",
  border:"rgba(255,255,255,0.06)", borderMid:"rgba(255,255,255,0.1)",
  text:"#EDE8DF", textSub:"#9BA3BF", textDim:"#3D4260",
  amber:"#E8A020", amberDim:"rgba(232,160,32,0.12)",
  red:"#E05252", redDim:"rgba(224,82,82,0.1)",
  green:"#3AAF7C", greenDim:"rgba(58,175,124,0.1)",
  blue:"#4A90D9", blueDim:"rgba(74,144,217,0.1)",
  teal:"#00C4A1", tealDim:"rgba(0,196,161,0.1)",
  violet:"#8B72E0", violetDim:"rgba(139,114,224,0.12)",
}
export function useIsMobile() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => { const fn = () => setW(window.innerWidth); window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn) }, [])
  return w < 768
}
export const API_URL = 'https://api.anthropic.com/v1/messages'
