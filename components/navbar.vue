<template>
  <div>
    <!-- Banner Section -->
    <div align="left">
      <img
        src="/image/banner.jpg"
        alt="Banner"
        style="width: 100%; height: auto"
      />
    </div>

    <!-- Navigation Bar -->
    <div class="navbar">
      <NuxtLink to="/Main">Halaman Utama</NuxtLink>
      <NuxtLink to="/Quiz">Kuiz Phishing</NuxtLink>
      <a href="OnlineScam.html" style="float: left; display: block; color: white; text-align: center; padding: 14px 20px; text-decoration: none; font-family: Arial, sans-serif;">Kenali Online Scam</a>
        <a href="News.html" style="float: left; display: block; color: white; text-align: center; padding: 14px 20px; text-decoration: none; font-family: Arial, sans-serif;">Berita</a>
        <a href="report.html" style="float: left; display: block; color: white; text-align: center; padding: 14px 20px; text-decoration: none; font-family: Arial, sans-serif;">Report</a>
        <a href="contact.html" style="float: left; display: block; color: white; text-align: center; padding: 14px 20px; text-decoration: none; font-family: Arial, sans-serif;">Pertanyaan Umum</a>
        <a href="about.html" style="float: left; display: block; color: white; text-align: center; padding: 14px 20px; text-decoration: none; font-family: Arial, sans-serif;">Tentang kami</a>
</div>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
};
</script>

<style scoped>
.navbar {
  overflow: hidden;
  background-color: #333;
}

.navbar a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
  font-family: Arial, sans-serif;
}
</style>
