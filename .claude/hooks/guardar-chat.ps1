# Guarda la conversación actual de Claude Code en la carpeta chats/ del proyecto.
# Se ejecuta automáticamente (hook "Stop") al terminar cada respuesta.
$ErrorActionPreference = 'Stop'
[Console]::InputEncoding = [System.Text.Encoding]::UTF8

$entrada = [Console]::In.ReadToEnd() | ConvertFrom-Json
$transcript = $entrada.transcript_path
if (-not $transcript -or -not (Test-Path $transcript)) { exit 0 }

$raiz = $env:CLAUDE_PROJECT_DIR
if (-not $raiz) { $raiz = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent }
$carpeta = Join-Path $raiz 'chats'
New-Item -ItemType Directory -Force $carpeta | Out-Null

$lineas = Get-Content -LiteralPath $transcript -Encoding UTF8
$md = New-Object System.Text.StringBuilder
$fechaInicio = $null

foreach ($linea in $lineas) {
    try { $obj = $linea | ConvertFrom-Json } catch { continue }
    if ($obj.type -ne 'user' -and $obj.type -ne 'assistant') { continue }
    if ($obj.isSidechain) { continue }
    $contenido = $obj.message.content
    $texto = ''
    if ($contenido -is [string]) {
        $texto = $contenido
    } else {
        $texto = (@($contenido) | Where-Object { $_.type -eq 'text' } | ForEach-Object { $_.text }) -join "`n`n"
    }
    if ([string]::IsNullOrWhiteSpace($texto)) { continue }
    if (-not $fechaInicio) { $fechaInicio = $obj.timestamp }
    $autor = if ($obj.type -eq 'user') { 'Usuario' } else { 'Claude' }
    [void]$md.AppendLine("## $autor  ($($obj.timestamp))").AppendLine().AppendLine($texto).AppendLine()
}

if ($md.Length -eq 0) { exit 0 }

$prefijo = if ($fechaInicio) { ([datetime]$fechaInicio).ToString('yyyy-MM-dd_HHmm') } else { Get-Date -Format 'yyyy-MM-dd_HHmm' }
$archivo = Join-Path $carpeta ("{0}_{1}.md" -f $prefijo, $entrada.session_id.Substring(0, 8))
$encabezado = "# Chat SmartTour AI - sesion $($entrada.session_id)`n`n"
[System.IO.File]::WriteAllText($archivo, $encabezado + $md.ToString(), (New-Object System.Text.UTF8Encoding $false))
