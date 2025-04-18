# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only .csproj file and restore
COPY Backend/ClothingAPIs/ClothingAPIs.csproj Backend/ClothingAPIs/
RUN dotnet restore Backend/ClothingAPIs/ClothingAPIs.csproj

# Copy the rest of the code
COPY Backend/ClothingAPIs/ Backend/ClothingAPIs/
WORKDIR /src/Backend/ClothingAPIs

# Publish the application
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Run
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ClothingAPIs.dll"]
