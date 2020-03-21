# COMMON PATHS

$buildFolder = (Get-Item -Path "./" -Verbose).FullName
$slnFolder = Join-Path $buildFolder "../"
$outputFolder = Join-Path $buildFolder "outputs"
$clerkApiFolder = Join-Path $slnFolder "ClerkApi"
$managerApiFolder = Join-Path $slnFolder "ManagerApi"

## CLEAR ######################################################################

Remove-Item $outputFolder -Force -Recurse -ErrorAction Ignore
New-Item -Path $outputFolder -ItemType Directory

## RESTORE NUGET PACKAGES #####################################################

Set-Location $slnFolder
dotnet restore

## CLERK API PROJECT ###################################################

Set-Location $clerkApiFolder
dotnet publish --output (Join-Path $outputFolder "ClerkApi") --configuration Release

## Manager API PROJECT ###################################################

Set-Location $managerApiFolder
dotnet publish --output (Join-Path $outputFolder "ManagerApi") --configuration Release

## CREATE DOCKER IMAGES #######################################################

# ClerkApi
Set-Location (Join-Path $outputFolder "ClerkApi")

docker rmi aidremind/clerk-api -f
docker build -t aidremind/clerk-api .

# ManagerApi
Set-Location (Join-Path $outputFolder "ManagerApi")

docker rmi aidremind/manager-api -f
docker build -t aidremind/manager-api .

## FINALIZE ###################################################################

Set-Location $outputFolder