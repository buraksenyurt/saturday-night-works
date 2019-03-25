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

        protected override async Task OnInitAsync()
        {
            await GetAllPlayers();
        }
        protected async Task GetAllPlayers()
        {
            // api/Players tahmin edileceği üzere PlayersController'a yapılan bir çağrıdır
            playerList = await Http.GetJsonAsync<List<Player>>("api/Players");
        }
    }
}