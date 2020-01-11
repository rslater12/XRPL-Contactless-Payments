	
var pcsc = require('pcsclite');
var pcsc = pcsc();

//Add addresss and secret, split them as below.
const address = '';//16 char	//sender/source address
const address1 = '';//13 char	 //sender/source address
const address2 = ''; //5 char		 	 //sender/source address
const secret = '';//16 char	//secret key Block 8
const secret1 =	'';  	//13 char//secret key Block 9



const { NFC } = require('nfc-pcsc');

const nfc = new NFC(); 

const tag = 'TAG_ISO_14443_3';



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
		data1.fill(13);

		const text1 = Buffer.from(address1);
		console.log(address1, 'converted', text1)
		data1.write(text1.toString());
		await reader.write(5, data1, 16); // blockSize=16 must specified for MIFARE Classic cards
		console.log(`data written`, data1);
		
		const data2 = Buffer.allocUnsafe(16);
		data2.fill(5);

		const text2 = Buffer.from(address2);
		console.log(address2, 'converted', text2)
		data2.write(text2.toString());
		await reader.write(6, data2, 16); // blockSize=16 must specified for MIFARE Classic cards
		console.log(`data written`, data2);
		
		
		
		
		console.log('Wrote Full Address: ' + text.toString() + text1.toString() + text2.toString())
		
		
	} catch (err) {
		console.error(`error when writing data`, err);
	}
	
	try {

		const data = await reader.read(4, 16, 16); // blockSize=16 must be specified for MIFARE Classic cards
		console.log(`Address read`,  data);
		//const payload = data.readInt32BE(0);
		const payload = Buffer.from(data).toString();
		console.log(`Address converted`, payload.toString());
		
		const data1 = await reader.read(5, 13, 16); // blockSize=16 must be specified for MIFARE Classic cards
		console.log(`data read`,  data1);
		const payload1 = Buffer.from(data1).toString();
		console.log(`Address1 converted`, payload1.toString());
		
		const data2 = await reader.read(6, 5, 16); // blockSize=16 must be specified for MIFARE Classic cards
		console.log(`data read`,  data2);
		const payload2 = Buffer.from(data2).toString();
		console.log(`Address2 converted`, payload2.toString());
		
	
		console.log('Address Read: ' + data + data1 + data2)
	
		
	} catch (err) {
		console.error(`error when reading data`, err);
	}
	try {
		await reader.authenticate(8, keyType, key);
		const data3 = Buffer.allocUnsafe(16);
		data3.fill(0);

		const text3 = Buffer.from(secret);
		console.log(secret, 'converted', text3)
		data3.write(text3.toString());
		await reader.write(8, data3, 16); // blockSize=16 must specified for MIFARE Classic cards
		console.log(`data written`, data3);
		
		const data4 = Buffer.allocUnsafe(16);
		data4.fill(13);

		const text4 = Buffer.from(secret1);
		console.log(secret1, 'converted', text4)
		data4.write(text4.toString());
		await reader.write(9, data4, 16); // blockSize=16 must specified for MIFARE Classic cards
		console.log(`data written`, data4);
		console.log('Wrote Secret Key: '+ text3.toString() + text4.toString())
		
	} catch (err) {
		console.error(`error when writing data`, err);
	}
	try {
		const data3 = await reader.read(8, 16, 16); // blockSize=16 must specified for MIFARE Classic cards
		console.log(`Secret Key read`,  data3);
		const payload3 = Buffer.from(data3).toString();
		console.log(`Secret Key converted`, payload3.toString());
		
		const data4 = await reader.read(9, 13, 16); // blockSize=16 must specified for MIFARE Classic cards
		console.log(`Secret Key1 read`,  data4);
		const payload4 = Buffer.from(data4).toString();
		console.log(`Secret Key1 converted`, payload4.toString());
		console.log('Secret Key Read: '+ payload3.toString() + payload4.toString())
	}
	catch (err) {
		console.error(`error when reading data`, err);
	}
});
});
	

	
	
	