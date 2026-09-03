export const openWhatsAppChat = () => {
  const phoneNumber = "+918294545018";
  const message = "Hello! I have a query regarding KrayaShop.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  // Alternative format: `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};
