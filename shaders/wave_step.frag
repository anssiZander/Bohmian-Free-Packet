#version 300 es
precision highp float;
precision highp sampler2D;

uniform sampler2D uState; 
uniform ivec2 uSimRes;

uniform float uHBAR;
uniform float uMass;
uniform float uDT;

uniform float uAbsorbPx;        
uniform float uAbsorbStrength;  

out vec4 fragColor;

float absorbW(vec2 xPx){
  if(uAbsorbPx <= 0.0) return 0.0;

  
  float leftFactor = 1.20;
  float dx = min(xPx.x * leftFactor, float(uSimRes.x) - 1.0 - xPx.x);
  float dy = min(xPx.y, float(uSimRes.y) - 1.0 - xPx.y);
  float d  = min(dx, dy);

  float t = clamp((uAbsorbPx - d) / max(uAbsorbPx, 1.0), 0.0, 1.0);
  
  
  float profile = t * t * t;
  
  return uAbsorbStrength * profile;
}

vec2 fetchPsi(ivec2 q){
  if(q.x < 0 || q.y < 0 || q.x >= uSimRes.x || q.y >= uSimRes.y) return vec2(0.0);
  return texelFetch(uState, q, 0).rg;
}

vec2 schrodingerRHS(vec2 psi, vec2 lapPsi){
  
  float cLap = uHBAR / (2.0*uMass);
  return vec2(-cLap*lapPsi.y,
               cLap*lapPsi.x);
}

void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);

  vec4 s = texelFetch(uState, p, 0);
  vec2 psi     = s.rg;
  vec2 psiPrev = s.ba;

  
  vec2 psiE = fetchPsi(p + ivec2( 1, 0));
  vec2 psiW = fetchPsi(p + ivec2(-1, 0));
  vec2 psiN = fetchPsi(p + ivec2( 0, 1));
  vec2 psiS = fetchPsi(p + ivec2( 0,-1));
  vec2 lapPsi = (psiE + psiW + psiN + psiS - 4.0*psi);

  
  vec2 rhs = schrodingerRHS(psi, lapPsi);

  
  vec2 xPx = vec2(p);
  float W = absorbW(xPx);
  rhs += -(W / uHBAR) * psi;

  
  vec2 psiNext = psiPrev + 2.0 * uDT * rhs;

  fragColor = vec4(psiNext, psi);
}
