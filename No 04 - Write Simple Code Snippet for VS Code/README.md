# Visual Studio Code için Code Snippet yazmak

Kod yazmamızı hızlandıran editör bazlı kolaylaştırıcılardan birisi de Code Snippet'lardır. Visual Studio Code'da herhangibir dil için code snippet yazmak oldukça basittir. Söz gelimi ben öğrenciliğim sürecince sıklıkla başvurduğum kobay JSON array'ler için bir snippet yazmak istedim.

## Başlangıç

Öncelikle Visual Studio Code açılır. Ardından Ctrl+Shift+P veya File->Preferences->User Snippets ile devam edilir

![credit_1](credit_1.png)

"Configure User Snippets" kısmına geçilir.

![credit_2](credit_2.png)

"New global snippet file" seçimi yapılır ve snippet için bir dosya adı verilir. Örneğin for-training gibi. İlgili dosya genellikle Code\User\snippets altında oluşur. Uzantısı code-snippets şeklindedir.

İçerği aşağıdaki gibi düzenlenebilir.

```
{
    "Ready Player One":{
        "scope": "javascript",
        "prefix": "players-json",
        "body": [
            "var ${2:players}=[",
            "\t{\"id\":1,\"nickname\":\"burkovski\",\"level\":98},",
            "\t{\"id\":2,\"nickname\":\"şedovnıst\",\"level\":56},",
            "\t{\"id\":3,\"nickname\":\"zamburota\",\"level\":77},",
            "\t{\"id\":4,\"nickname\":\"çaykovskili\",\"level\":54},",
            "\t{\"id\":5,\"nickname\":\"lüff-er\",\"level\":41},",
            "\t{\"id\":6,\"nickname\":\"pır-as-sa\",\"level\":84}",
            "];",
            
            "for (var ${1:i} = 0; ${1:i} < ${2:players}.length; ${1:i}++) {",
            "\tvar ${1:i}_data=${2:players}[${1:i}];",
            "\tconsole.log(${1:i}_data);",
            "\t//do something here",
            "\t$0",
            "}"
          ],
        "description": "JSON array for to do something with for loops"
    }
}
```

Basit bir JSON dokümanı söz konusudur. 

- scope özelliğinde ilgili snippet'ın hangi dil veya dillerde kullanılacağı belirtilir.
- prefix özelliğinde tahmin edileceği gibi snippet'ın kısaltması bulunur.
- body özelliğinde kod bloğuna yer verilir.
- description ile bu snippet hakkında geliştirici için ek bilgi sunulur.
- Geliştiricinin kod yazarken değişiklik yapabileceği parametreler ${1:değişken_adı} notasyonu ile belirlenir. 
- Escape karakterler için \ sembolünden yararlanılır _(Örneğin \t ile bir tab atlanır)_

## Örneğin denenmesi

Snippet dosyası kaydedildikten sonra örnek bir javascript dosyası açılır. İçi boş haldeyken 

```
players-json
```

yazılır ve tab'lar ile ilerlenerek kod tamamlanır. Çalışma zamanı sonuçlarına bakıp snippet'ı işe yaradığından emin olmak için uygulama aşağıdaki terminal komutu ile başlatılır.

```
node index.js
```

![credit_4](credit_4.png)

Biraz daha detay için [şu](https://scotch.io/bar-talk/write-less-code-by-creating-snippets-in-visual-studio-code) adrese uğrayabilirsiniz.

## Neler Öğrendim?

- Visual Studio Code için geliştirmeyi hızlandırıcı _(ki günümüzde acele ama çabuk kod yazmak çok mühim :P)_ snippet'ların nasıl yazılabileceğini