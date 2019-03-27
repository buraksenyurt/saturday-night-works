using System;
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
    Temel görevi yeni bir oyuncuyu eklemektir. (Firestore veri tabanına)
     */
    public class NewPlayerModel 
    : BlazorComponent
    {
        /*
        API servisine göndereceğimiz talepleri ele alan HttpClient nesnesini
        Property Injection ile içeriye alıyoruz.
         */
        [Inject]
        protected HttpClient Http { get; set; }
        // Önyüzdeki HTML elementlerini bu özelliğe bağlayacağız (bind)
        protected Player player = new Player();

        protected async Task AddPlayer()
        {
            /* api/Players tahmin edileceği üzere PlayersController'a yapılan bir çağrıdır
            HTTP Post tipinden bir çağrı söz konusu ve parametre olarak player bilgisini gönderiyoruz.
            Dolayısıyla API tarafındaki Post isimli metot (farklı bir isimde verilebilir, HttpMethod.Post ile karıştırmayın) çağırılacaktır.
            player değişkeni, önyüz tarafına bind edildiği için, kontrollerin verisini içerecektir.
            */
            await Http.SendJsonAsync(HttpMethod.Post, "/api/Players/", player);            
        }
    }
}