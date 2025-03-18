async function rollGacha() {
    try {
        const response = await fetch("/api/coffee"); // サーバー経由で楽天APIを取得
        const data = await response.json();
        const items = data.Items;

        if (!items || items.length === 0) {
            alert("コーヒー豆が見つかりませんでした。");
            return;
        }

        const randomIndex = Math.floor(Math.random() * items.length);
        const coffee = items[randomIndex].Item;

        document.getElementById("coffee-name").textContent = coffee.itemName;
        document.getElementById("coffee-img").src = coffee.mediumImageUrls[0].imageUrl;
        document.getElementById("coffee-price").textContent = `¥${coffee.itemPrice}`;
        document.getElementById("coffee-link").href = coffee.itemUrl;
        document.getElementById("result").style.display = "block";
    } catch (error) {
        console.error("エラーが発生しました", error);
        alert("データの取得に失敗しました。");
    }
}
