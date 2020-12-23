<template>
  <div></div>
</template>

<script>
import filter from '@/plugins/filters'
import qs from 'querystring'
export default {
  layout: 'log',
  async mounted() {
    let terminal = 'Other'
    if (this.$device.isWindows) {
      terminal = 'Windows'
    } else if (this.$device.isMacOS) {
      terminal = 'Mac'
    }
    const { data } = await this.$axios.post('/buriedPoint/log', qs.stringify({
      eventId: 'qrcode_yyb_app',
      eventTarget: JSON.stringify({
        "jump_target": "yyb",
        "qrcode_id": this.$route.query.id || 1,
        "event_time": filter.formatDate(Date.now()),
        "bizsys": "PC",
        "terminal": terminal
      }),
      terminal,
      bizSys: 'PC',
      eventTheme: 'Qrcode'
    }))
    if (data) {
      location.replace('https://a.app.qq.com/o/simple.jsp?pkgname=com.power.dapengeducation&fromcase=40003')
    }
  }
}
</script>
