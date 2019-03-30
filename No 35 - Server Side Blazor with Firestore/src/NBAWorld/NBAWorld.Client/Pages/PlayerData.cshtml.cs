using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using NBAWorld.Shared.Models;
using Microsoft.AspNetCore.Blazor;
using Microsoft.AspNetCore.Blazor.Components;

namespace NBAWorld.Client.Pages
{
    /*
    Razor sayfamız tarafından kullanılan Blazor bileşeni.
    Doğrudan PlayersController APIsi ile konuşur.
     */
    public class PlayerDataModel
    : BlazorComponent
    {
        /*
        API servisine göndereceğimiz talepleri ele alan HttpClient nesnesini
        Property Injection ile içeriye alıyoruz.
         */
        [Inject]
        protected HttpClient Http { get; set; }
        protected List<Player> playerList = new List<Player>();
        protected Player currentPlayer = new Player();

        protected override async Task OnInitAsync()
        {
            await GetAllPlayers();
        }
        protected async Task GetAllPlayers()
        {
            // api/Players tahmin edileceği üzere PlayersController'a yapılan bir çağrıdır
            playerList = await Http.GetJsonAsync<List<Player>>("api/Players");
        }

        /*
            bir dokümanı (yani oyuncuyu) silmek için kullandığımız fonksiyon
         */
        protected async Task DeletePlayer(string documentId)
        {
            // Doğrudan HTTP delete tipinden bir çağrı yapıyoruz
            // QueryString parametresi olarak arayüzden gelen doküman Id bilgisini kullanıyoruz
            await Http.DeleteAsync($"/api/Players/{documentId}");
            // Silme işlemi sonrası listeyi tekrar güncellemekte yarar var.
            await GetAllPlayers();
        }

        /*
        Güncelleme işleminden önce documentId ile oyuncu bilgilerini
        bulmaya çalıştığımız metod.
         */
        protected async Task GetPlayerForEdit(string documentId)
        {
            // Web API tarafına bir HTTP Get çağrısı yapıyoruz.
            // adresin son kısmında doküman id bilgisi bulunuyor.
            currentPlayer = await Http.GetJsonAsync<Player>("/api/Players/" + documentId);
        }

        /*
        Oyuncu bilgilerini güncellemek için kullanılan metodumuz.
        Parametre almadığına bakmayın. Razor sayfasındaki bileşenlere bağlanan
        currentPlayer içeriği kullanılıyor. Bu değişken güncelleme için
        açılan Modal Popup tarafından değiştirilebilmekte.
         */
        protected async Task UpdatePlayer()
        {
            // Web API tarafına HTTP Put metodu ile bir çağrı yapıyoruz
            // Request Body'de currentPlayer içeriği yollanıyor.
            await Http.SendJsonAsync(HttpMethod.Put, "api/players/", currentPlayer);
            await GetAllPlayers();
        }
    }
}