# Safer Way to Store JWT

## Pendahuluan
Sering kali kita melihat tutorial di beberapa situs yang memperkenalkan kita terhadap metode otentikasi ialah menggunakan JWT. JWT atau yang sering dikenal dengan JSON Web Token merupakan suatu entitas yang dapat merepresentasikan seseorang secara aman dengan menggunakan metode signing. Kenapa aman? Karena pesan yang kita simpan ke dalam suatu *payload* JWT ini akan di sign oleh sistem JWT, dan ketika ada orang yang merubah payload ini maka akan tidak valid, karena hasil signnya tidaklah sama.

## Permasalahan
Kalau JWT itu sudah aman tetapi kenapa kita tetap harus memperhatikan penyimpanannya?  
Karena JWT merupakan entitas yang stateless, ketika kita mempunyai JWT dan JWT kita diambil atau dicuri oleh orang lain, artinya mereka memiliki JWT yang benar atas nama kita dan dapat mengatasnamakan request mereka dengann nama kita. Dengan hal ini kita harus tau bagaimana cara yang setidaknya JWT yang didapatkan tetap aman dengan kita, dan bagaimana backend dapat mengikuti keamanan yang kita buat.

## Metode
Salah satu cara untuk menyimpan JWT di dalam web browser menggunakan [httpOnly Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies). Dengan menggunakan hal tersebut, JWT yang disimpan di dalam cookies tidak dapat dibaca dengan menggunakan javascript yang terimplmentasi di dalam browser dan mencegah adanya [CSRF](https://owasp.org/www-community/attacks/csrf).

Biasanya juga kita mengetahui bahawa untuk merequest dengan JWT, kita harus menaruh token tersebut di dalam header Authorization. Tetapi karena kita menggunakan httpOnly Cookies kita harus bisa menghandle dimana JWT akan dikirim melalalui Cookie Header atau Authorization Header.

### Cara menyimpan JWT
Untuk menyimpan JWT di dalam httpOnly Cookies, kita harus mengirim response dari server untnuk client dengan header [Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie). Dapat dilihat di dalam file `backend/index.js` pada line `42-54` bahwa kita membuat JWT terlebih dahulu lalu memasukkan ke dalam fungsi `res.cookie()`. Ada beberapa parameter yang penting di dalam fungsi ini, yang utama ialah atribut `httpOnly` yang di set `true`. Hal inilah yang menjadi kunci untuk menaruh JWT kita di dalam httpOnly Cookies.

### Cara membaca JWT
Dapat dilihat pada file `backend/utils/jwt.js` bahwa kita sudah menyiapkan fungsi `JwtMiddleware` yang akan mengecek apakah request ini terdapat JWT di dalam header Cookies ataupun Authorization. Jika tidak terdapat JWT maka akan ditolak dengan status Unauthorized.

## Demo
Pre-requisite: Node.js `>14.0`, Node Package Manager (npm), dan Port `3000` dan `3001` tersedia.
1. Masuk ke dalam folder backend dan jalankan command `npm i`
2. Masuk ke dalam folder frontend dan jalankan command `npm i`
3. Nyalakan server backend dengan menjalankan command `npm run dev`
4. Nyalakan server frontend dengan menjalankan comman `npm run dev`
5. Masuk ke dalam alamat `http://127.0.0.1/`
6. Masukkan `username` dan `password` yang berisi `kaenova` dan `mahendra`.
7. Lihat DevTools dan buka tab network untuk melihat request yang ada.
