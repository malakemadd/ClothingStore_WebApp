# Use .NET SDK to build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only the .csproj file and restore
COPY Backend/ClothingAPIs/ClothingAPIs.csproj Backend/ClothingAPIs/
RUN dotnet restore Backend/ClothingAPIs/ClothingAPIs.csproj

# Copy all source files
COPY Backend/ClothingAPIs/ Backend/ClothingAPIs/
WORKDIR /src/Backend/ClothingAPIs

# Build and publish to /app/publish
RUN dotnet publish -c Release -o /app/publish

# Use the ASP.NET runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ClothingAPIs.dll"]
