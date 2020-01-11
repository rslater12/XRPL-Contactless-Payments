var pcsc = require('pcsclite');
var pcsc = pcsc();
const fiatrate = require('node-fetch');
const RippleAPI = require('ripple-lib').RippleAPI;

const dstAddress = 'rhAb9uew2PLRjKBm5D945LsGai3qHUCtJg'; //destination address, retail provider.
const dstTag = '1'; //destination tag, possible receipt number? or print transaction hash.
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'});
const productvalue = '10'; // value of product to pay retailer provider.

const { NFC } = require('nfc-pcsc');

const nfc = new NFC(); 

nfc.on('reader', async reader => {
	console.log('Device Attached')
	console.log('Awaiting Card for Payment!')
	reader.on('card', async card => {
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
	// example reading 12 bytes assuming containing text in utf8
	try {
async function read() {
	
	const data = await reader.read(4, 16, 16); // blockSize=16 must specified for MIFARE Classic cards
	console.log(`Address read`,  data);
	const payload = Buffer.from(data).toString();
	console.log(`Address converted`, payload.toString('utf8'));
	
	const data1 = await reader.read(5, 13, 16); // blockSize=16 must specified for MIFARE Classic cards
	console.log(`data read`,  data1);
	const payload1 = Buffer.from(data1).toString();
	console.log(`Address1 converted`, payload1.toString('utf8'));
	
	const data2 = await reader.read(6, 5, 16); // blockSize=16 must specified for MIFARE Classic cards
	console.log(`data read`,  data2);
	const payload2 = Buffer.from(data2).toString();
	console.log(`Address2 converted`, payload2.toString('utf8'));
	
	console.log('Address Read: ' + payload.toString('utf8') + payload1.toString('utf8') + payload2.toString('utf8'))
	
	await reader.authenticate(8, keyType, key);
	
	const data3 = await reader.read(8, 16, 16); // blockSize=16 must specified for MIFARE Classic cards
	console.log(`Secret Key read`,  data3);
	const payload3 = Buffer.from(data3).toString();
	//console.log(`Secret Key converted`, payload3.toString());
	
	const data4 = await reader.read(9, 13, 16); // blockSize=16 must specified for MIFARE Classic cards
	console.log(`Secret Key1 read`,  data4);
	const payload4 = Buffer.from(data4).toString();
	//console.log(`Secret Key1 converted`, payload4.toString());
	//console.log('Secret Key Read: ' + payload3.toString('utf8') + payload4.toString('utf8'))
		
		var text = data + data1 + data2;
		var text1 = data3 + data4;
	
			
		async function pay() {
			
			console.log("Balance in XRP to Pay " + productvalue)
			const srcAddress  = text;
			const secret = text1;
			console.log('customeradd ',srcAddress)
			//console.log('customerkey ',secret)
			
	
	const Note = srcAddress + ' Has Made Payment';
const payment = {
		
			  source: {
			    address: srcAddress,
			    maxAmount: {
			      value: '1.001',
			      currency: 'XRP'
			    }
			  },
			  destination: {
			    address: dstAddress,
			    
			    //tag: dstTag,
			    amount: {
			      value: productvalue,
			      currency: 'XRP'
			    }	 
			  },
			  memos: [
			      {
			    	  
			          data: Note
			      }
			    ]  
			 
	  
			};

			function quit(message) {
			  console.log(message);
			 // process.exit(0);
			}

			function fail(message) {
			  console.error(message);
			  //process.exit(1);
			}

			api.connect().then(() => {
			  console.log('Connected...');
			  return api.preparePayment(srcAddress, payment).then(prepared => {
			    console.log('Payment transaction prepared...');
			    const {signedTransaction} = api.sign(prepared.txJSON, secret);
			    console.log('Payment transaction signed...');
			    console.log('Payment has Been Made By ' + srcAddress);
			    api.submit(signedTransaction).then(quit, fail);
			  });
			}).catch(fail);
	}
	pay()
		
}
read()
	} catch (err) {
		console.error(`error when reading data`, err);
	}

	
	

});
});
	
