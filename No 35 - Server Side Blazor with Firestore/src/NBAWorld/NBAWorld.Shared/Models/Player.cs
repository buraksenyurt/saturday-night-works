using System;
using Google.Cloud.Firestore;

/*
    Firestore tarafındaki players koleksiyonundaki her bir 
    dokümanın kod tarafındaki karşılığını ifade eden sınıfımız

    Koleksiyon eşleştirmesi için FirestoreData kullanıldı.
    Sadece FirestoreProperty niteliği ile işaretlenen özellikler
    Firestore tarafında işleme alınır.
 */
namespace NBAWorld.Shared.Models
{
    [FirestoreData]
    public class Player{
        public string DocumentId{get;set;}
        [FirestoreProperty]
        public string Fullname { get; set; }
        [FirestoreProperty]
        public string Length { get; set; }
        [FirestoreProperty]
        public string Position { get; set; }
        [FirestoreProperty]
        public string SomeInfo { get; set; }

    }
}