# Microsoft'ın dotnet sdk imajını aldık
FROM microsoft/dotnet:sdk AS build-env
# takip eden komutları çalıştıracağımız klasörü set ettik
WORKDIR /app

# Gerekli dotnet kopyalamalarını yaptırıp
# Restore ve publish işlemlerini gerçekleştiriyoruz
COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

# Çalışma zamanı imajının oluşturulmasını istiyoruz
FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out .
# Uygulamanın giriş noktasını belirtiyoruz
ENTRYPOINT [ "dotnet","InstanceAPI.dll" ]