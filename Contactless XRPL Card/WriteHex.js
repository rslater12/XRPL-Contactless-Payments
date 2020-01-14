var pcsc = require('pcsclite');
var pcsc = pcsc();

const { NFC } = require('nfc-pcsc');

const nfc = new NFC(); 

const tag = 'TAG_ISO_14443_3';

const address = '724571634d7a706e';//16 char	//sender/source address
const address1 = '724e515479597077';//16 char	 //sender/source address
const address2 = '4548576572443142'; //16 char		 	 //sender/source address
const address3 = '7036316d5820486a';//16 char	//secret key Block 8
const address4 =	'696859';  	//6 char//secret key Block 9

var part;

nfc.on('reader', async reader => {
	console.log('Device Attached')
	console.log('Add Card to Reader')
	reader.on('card', async card => {
		if (card.type !== tag) {
			return;
		}
		const key = 'FFFFFFFFFFFF'; // key must be a 12-chars HEX string, an instance of Buffer, or array of bytes
		const KEY_TYPE_A = 0x60;
		const keyType = KEY_TYPE_A;
	console.log();
	console.log(`card detected`, card);
	
try {
	await reader.authenticate(4, keyType, key);
	
	
	
}catch (err){
	console.log('error')
}

	
	try {

		const data = Buffer.allocUnsafe(16);
		data.fill(0);
		
		const text = Buffer.from(address);
		console.log(address, 'converted', text)
		//const randomNumber = Math.round(Math.random() * 1000);
		data.write(text.toString());
		await reader.write(4, data, 16); // blockSize=16 must specified for MIFARE Classic cards
		console.log(`data written`, data);
		
		const data1 = Buffer.allocUnsafe(16);
		data1.fill(16);

		const text1 = Buffer.from(address1);
		console.log(address1, 'converted', text1)
		data1.write(text1.toString());
		await reader.write(5, data1, 16); // blockSize=16 must specified for MIFARE Classic cards
		console.log(`data written`, data1);
		
		const data2 = Buffer.allocUnsafe(16);
		data2.fill(16);

		const text2 = Buffer.from(address2);
		console.log(address2, 'converted', text2)
		data2.write(text2.toString());
		await reader.write(6, data2, 16); // blockSize=16 must specified for MIFARE Classic cards
		console.log(`data written`, data2);
		
		
		part = data + data1 + data2;
		
		console.log('Wrote Partial Hex to Blocks 4-6: ' + text.toString() + text1.toString() + text2.toString())
		
		
	} catch (err) {
		console.error(`error when writing data`, err);
	}
	try {

		const data = await reader.read(4, 16, 16); // blockSize=16 must be specified for MIFARE Classic cards
		console.log(`Address read`,  data);
		//const payload = data.readInt32BE(0);
		const payload = Buffer.from(data).toString();
		console.log(`Address converted`, payload.toString());
		
		const data1 = await reader.read(5, 16, 16); // blockSize=16 must be specified for MIFARE Classic cards
		console.log(`data read`,  data1);
		const payload1 = Buffer.from(data1).toString();
		console.log(`Address1 converted`, payload1.toString());
		
		const data2 = await reader.read(6, 16, 16); // blockSize=16 must be specified for MIFARE Classic cards
		console.log(`data read`,  data2);
		const payload2 = Buffer.from(data2).toString();
		console.log(`Address2 converted`, payload2.toString());
		
	
		console.log('Hex Partial Read 1: ' + data + data1 + data2)
	} catch (err) {
		console.error(`error when writing data`, err);
	}
	
	try {
		await reader.authenticate(8, keyType, key);
		const data3 = Buffer.allocUnsafe(16);
		data3.fill(16);

		const text3 = Buffer.from(address3);
		console.log(address3, 'converted', text3)
		data3.write(text3.toString());
		await reader.write(8, data3, 16); // blockSize=16 must specified for MIFARE Classic cards
		console.log(`data written`, data3);
		
		const data4 = Buffer.allocUnsafe(16);
		data4.fill(6);

		const text4 = Buffer.from(address4);
		console.log(address4, 'converted', text4)
		data4.write(text4.toString());
		await reader.write(9, data4, 16); // blockSize=16 must specified for MIFARE Classic cards
		console.log(`data written`, data4);
		console.log('Wrote partial Address 2: '+ text3.toString() + text4.toString())
		
	} catch (err) {
		console.error(`error when writing data`, err);
	}
	
	try {

		
		const data3 = await reader.read(8, 16, 16); // blockSize=16 must specified for MIFARE Classic cards
		console.log(`Address3 read`,  data3);
		const payload3 = Buffer.from(data3).toString();
		console.log(`Address3 converted`, payload3.toString());
		
		const data4 = await reader.read(9, 6, 16); // blockSize=16 must specified for MIFARE Classic cards
		console.log(`Address4 read`,  data4);
		const payload4 = Buffer.from(data4).toString();
		console.log(`Address4 converted`, payload4.toString());
		console.log('Hex Partial read 2: ' + payload3.toString() + payload4.toString())
		console.log('Full Hexed address: '+ part + data3 + data4)
		const full = Buffer.from(part + data3 + data4, 'hex').toString('utf8');
		console.log('Hex Converted to Text: ' + full.toString('utf8') )
	}
	catch (err) {
		console.error(`error when reading data`, err);
	}
});
});
	

	
	
