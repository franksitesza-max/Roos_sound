$ErrorActionPreference = 'Stop'

Write-Host ""
Write-Host "Checking for dangerous JavaScript and HTML patterns..."

$allFiles = Get-ChildItem -Recurse -File | Where-Object {
  $_.FullName -notmatch '\\(node_modules|\.git|\.vercel|dist)\\'
}

$codeFiles = $allFiles | Where-Object { $_.Extension -in '.js', '.jsx', '.html' }
$htmlFiles = $allFiles | Where-Object { $_.Extension -eq '.html' }

$dangerousPattern = 'eval\(|new Function\(|setTimeout\(["'']|setInterval\(["'']|document\.write|innerHTML|outerHTML|insertAdjacentHTML|srcdoc'
$inlineHandlerPattern = '\son[a-zA-Z]+='
$unsafeLinkPattern = 'href\s*=\s*["'']\s*javascript:|target="_blank"(?![^>]*rel="[^"]*noopener[^"]*noreferrer[^"]*")(?![^>]*rel="[^"]*noreferrer[^"]*noopener[^"]*")'

$dangerousMatches = $codeFiles | Select-String -Pattern $dangerousPattern
$inlineMatches = $htmlFiles | Select-String -Pattern $inlineHandlerPattern
$unsafeLinkMatches = $htmlFiles | Select-String -Pattern $unsafeLinkPattern

if ($dangerousMatches) {
  $dangerousMatches
}

Write-Host ""
Write-Host "Checking for inline event handlers..."
if ($inlineMatches) {
  $inlineMatches
}

Write-Host ""
Write-Host "Checking for unsafe links..."
if ($unsafeLinkMatches) {
  $unsafeLinkMatches
}
