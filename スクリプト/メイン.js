let 画面の横幅 = 1080;
let 画面の縦幅 = 1080;

const ゲームの設定 = {
	type: Phaser.AUTO,
	width: 画面の横幅,
	height: 画面の縦幅,
	scene: {
		preload: プリロード,
		create: クリエイト,
        update: アップデート
	},

	fps:{
		target: 60
	},
    scale: {
		orientation: Phaser.Scale.Orientation.PORTRAIT,
		mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH,
		
    }
}

new Phaser.Game(ゲームの設定);

function プリロード(){
	this.cameras.main.centerOn(0, 0);
	this.load.image("はいけい", "./画像/テスト背景2.jpg");
	this.load.image("カード画像", "./画像/テスト3.jpg");
	this.load.image("カードフレーム", "./画像/カードフレーム3.png");
	this.load.image("レア", "./画像/レア3.png");
}

let text;

let コンテナオブジェクト;

function クリエイト(){
	let 背景 = this.add.image(0, 0, "はいけい");
	背景.setDisplaySize(1080, 1080);

	let 生成カード = this.add.image(0, 0, "カード画像");
	生成カード.setDisplaySize(150, 150);

	let 生成カードフレーム = this.add.image(0, 0, "カードフレーム");
	生成カードフレーム.setDisplaySize(160, 200);

	let 生成レアリティ = this.add.image(60, -60, "レア");
	生成レアリティ.setDisplaySize(50, 60);

	コンテナオブジェクト = this.add.container(0, 0);
	コンテナオブジェクト.add(生成カードフレーム);
	コンテナオブジェクト.add(生成カード);
	コンテナオブジェクト.add(生成レアリティ);
	コンテナオブジェクト.setSize(160, 200);

	コンテナオブジェクト.setInteractive({ draggable: true });
	コンテナオブジェクト.setDepth(1000);

	this.input.on('dragstart', (pointer, gameObject) => {
		this.scale.startFullscreen();
		console.log('ドラッグ開始', pointer.x, pointer.y);
	});
	
	this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
		gameObject.x = dragX;
		gameObject.y = dragY;
		//console.log('ドラッグ中', pointer.isDown); // ポインターが押されているか確認
	});
	
	this.input.on('dragend', (pointer, gameObject) => {
		console.log('ドラッグ終了', pointer.x, pointer.y);
	});
}

let カウント = 0;

function アップデート(time, delta){
    if(カウント < 100){
        let ランダム1 = Math.floor(Math.random() * (300 - -300) + -300);
        let ランダム2 = Math.floor(Math.random() * (700 - -700) + -700);
        let 生成カード = this.add.image(ランダム1, ランダム2, "カード画像");
		生成カード.setDisplaySize(200, 200);
        カウント += 1;
    }
}

