/* =================================
   TEXT DATA
   (Official exam typing texts)
   ================================= */

/*
  id        : benzersiz metin kimliği
  source    : sınav / yıl bilgisi
  text      : yazılacak metin
*/

const TEXTS = [

  {
  id: "60106",
source: "CTE Katipliği Metinleri / 2. Metin",
  text: `
Hükümlü ve tutuklulara verilecek eğitimin, dış dünyada aynı yaş gruplarına sağlanan eğitimle aynı olması sağlanacak ve öğrenme fırsatlarının alanı olabildiğince geniş tutulacaktır. Ceza infaz kurumlarında eğitim, kişinin sosyal, ekonomik ve kültürel şartlarını akılda tutarak onu bir bütün halinde geliştirmeyi hedefleyecektir. Ceza infaz kurumları sisteminin yönetimine katılanların ve ceza infaz kurumlarını yönetenlerin hepsi eğitimi mümkün olabildiğince daha fazla destekleyecek ve kolaylaştıracaktır. Hükümlü ve tutukluların, eğitimin bütün yönlerine aktif olarak katılmasını teşvik etmek için her türlü çaba gösterilecektir.

Ceza infaz kurumları eğitimcilerinin, uygun yetişkin eğitim metotlarını benimsemelerinin sağlanması için geliştirme programları temin edilecektir. Özel zorlukları olan hükümlü ve tutuklulara ve özellikle okuma yazma problemi olanlara özel itina gösterilecektir. Mesleki eğitim, bireyin daha geniş olarak geliştirilmesine olduğu kadar, iş piyasasındaki ihtiyaçlar da dikkate alınarak düzenlenecektir.

Hükümlü ve tutuklular haftada en az bir kez, iyi düzenlenmiş bir kütüphaneye gidebilmelidir. Hükümlü ve tutukluların beden eğitimi çalışmaları yapmaları ve spor faaliyetlerine katılmaları teşvik edilmelidir. Ayrıca yaratıcı ve kültürel faaliyetlere önemli bir rol verilmelidir. Çünkü bu faaliyetler hükümlü ve tutukluların kendilerini ifade etmelerinde ve geliştirmelerinde özel bir potansiyele sahiptir.

Sosyal eğitim, topluma geri dönmesini kolaylaştırmak amacıyla, hükümlü ve tutukluların ceza infaz kurumlarındaki günlük yaşamını idare etmesini sağlayacak uygulanabilir unsurları içine almalıdır. Hükümlü ve tutukluların ceza ve infaz kurumlarındaki eğitimlerinde yukarıda belirtilen hususlara özen gösterilmesi gerekmektedir.
`
}

];

/* Rastgele metin seç */
function getRandomText() {
  const index = Math.floor(Math.random() * TEXTS.length);
  return TEXTS[index];
}

/* Dışarıya aç */
window.TEXTS = TEXTS;
window.getRandomText = getRandomText;
