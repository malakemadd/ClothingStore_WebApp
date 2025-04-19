# Base runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy csproj and restore
COPY ClothingAPIs/ClothingAPIs.csproj ./ClothingAPIs/
RUN dotnet restore "./ClothingAPIs/ClothingAPIs.csproj"

# Copy rest of the code
COPY ClothingAPIs/. ./ClothingAPIs/
WORKDIR /src/ClothingAPIs
RUN dotnet build "ClothingAPIs.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "ClothingAPIs.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ClothingAPIs.dll"]
