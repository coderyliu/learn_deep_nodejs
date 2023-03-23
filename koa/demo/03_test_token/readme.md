### token的组成
#### token的组成一共有三部分：header(头部),payload(载荷)，signture(签名)
   头部包括：{type:'jwt',algorithm:'hs256'}默认是hs256，采用对称加密,默认的话header是不用自己写的
   载荷包括:{id,name,time,...}用户的Id,name，签名的有效时间，颁发时间等等，payLoad是必须声明部分
   签名：包括密钥，hs256就是对称密钥，rs256就是公钥或者私钥

   头部和载荷都是使用的base64进行编码，只是编码，并不是加密，是能够被反编码的，所以在payLoad里面放的都是不重要的信息
   签名部分才是真正的加密，所以是不能够被破解的，但是要注意保护密钥

### 对于密钥的生成
#### 密钥的生成我们可以利用(mac电脑直接使用)，window电脑使用git bash可以直接使用openssL,利用相应的指令生成密钥

#### 在通过文件读取，结合jsonwebtoken这个第三方库来使用密钥生成token,验证token