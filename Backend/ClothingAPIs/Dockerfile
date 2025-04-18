# Use the .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

# Copy everything and restore dependencies
COPY . ./
RUN dotnet restore

# Publish the app in Release mode
RUN dotnet publish -c Release -o /app/publish

# Use the ASP.NET runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
COPY --from=build /app/publish .

# This allows Railway to bind to the appropriate port dynamically
ENV ASPNETCORE_URLS=http://+:$PORT

ENTRYPOINT ["dotnet", "ClothingAPIs.dll"]
