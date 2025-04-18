FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ./Backend/ClothingAPIs/ClothingAPIs.csproj ./ClothingAPIs/
RUN dotnet restore ./ClothingAPIs/ClothingAPIs.csproj

COPY ./Backend/ClothingAPIs/ ./ClothingAPIs/
WORKDIR /src/ClothingAPIs
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ClothingAPIs.dll"]
