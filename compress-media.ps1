# Script para copiar fotos/vídeos
$sourceDir = "d:\08. Trancoso & Arraial\Perainda\Revisao Geral"
$destDir = "d:\site-casadeperainda\src\public"

$imageDest = "$destDir\images"
$videoDest = "$destDir\videos"

if (!(Test-Path $imageDest)) {
    New-Item -ItemType Directory -Force -Path $imageDest | Out-Null
}
if (!(Test-Path $videoDest)) {
    New-Item -ItemType Directory -Force -Path $videoDest | Out-Null
}

$accommodations = @(
    "Casa Areia",
    "Casa Concha",
    "Casa Coral",
    "Casa Mar",
    "Casa Tartaruga",
    "Suíte Ancora",
    "Suíte Cavalo Marinho",
    "Suíte Estrela do Mar",
    "Suíte Marimbá"
)

foreach ($accom in $accommodations) {
    Write-Host "Processando: $accom" -ForegroundColor Cyan

    $accomPath = Join-Path $sourceDir $accom
    if (!(Test-Path $accomPath)) {
        Write-Host "  [ERRO] Pasta não encontrada" -ForegroundColor Red
        continue
    }

    $imagePath = Join-Path $imageDest $accom
    $videoPath = Join-Path $videoDest $accom

    if (!(Test-Path $imagePath)) {
        New-Item -ItemType Directory -Force -Path $imagePath | Out-Null
    }
    if (!(Test-Path $videoPath)) {
        New-Item -ItemType Directory -Force -Path $videoPath | Out-Null
    }

    # Copiar JPGs
    $jpgFiles = Get-ChildItem -Path $accomPath -Filter "*.jpg" -File
    Write-Host "  $($jpgFiles.Count) fotos JPG"
    foreach ($jpg in $jpgFiles) {
        $destPath = Join-Path $imagePath $jpg.Name
        Copy-Item -Path $jpg.FullName -Destination $destPath -Force
        Write-Host "    OK: $($jpg.Name)"
    }

    # Copiar MP4s
    $mp4Files = Get-ChildItem -Path $accomPath -Filter "*.mp4" -File
    Write-Host "  $($mp4Files.Count) vídeos MP4"
    foreach ($mp4 in $mp4Files) {
        $destPath = Join-Path $videoPath $mp4.Name
        Copy-Item -Path $mp4.FullName -Destination $destPath -Force
        Write-Host "    OK: $($mp4.Name)"
    }

    Write-Host ""
}

Write-Host "✅ Concluído!" -ForegroundColor Green

$imageSize = (Get-ChildItem -Recurse $imageDest -ErrorAction SilentlyContinue | Measure-Object -Sum Length).Sum
$videoSize = (Get-ChildItem -Recurse $videoDest -ErrorAction SilentlyContinue | Measure-Object -Sum Length).Sum
Write-Host "Imagens: $([math]::Round($imageSize/1MB, 2)) MB"
Write-Host "Vídeos: $([math]::Round($videoSize/1MB, 2)) MB"
Write-Host "Total: $([math]::Round(($imageSize + $videoSize)/1MB, 2)) MB"
