# Step 1: Use the .NET 8 SDK to build the app
FROM mcr.microsoft.com/dotnet/sdk:9.0.203 AS build
WORKDIR /src

# Copy everything and restore dependencies
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# Step 2: Use the ASP.NET runtime to run the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

# Replace 'ClothingAPIs.dll' with your actual project output if different
ENTRYPOINT ["dotnet", "ClothingAPIs.dll"]
