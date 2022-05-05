<template>
  <nav class="navbar shadow-sm">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'Dashboard' }">
        <img :src="require('@/assets/img/logo.png')" class="logo" alt="logo" />
      </router-link>
      <div class="spacer"></div>
      <div class="nav-menu">
        <span>Hello {{ username }}</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="fs-3 bi bi-sliders"></i
          ></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item><router-link :to="{name: 'Dashboard'}">Dashboard</router-link></el-dropdown-item>
              <el-dropdown-item><router-link :to="{name: 'Logger'}">Logger</router-link></el-dropdown-item>
              <el-dropdown-item v-if="isAdmin"><router-link :to="{name: 'Overview'}">Overview</router-link></el-dropdown-item>
              <el-dropdown-item divided><router-link :to="{name: 'Account'}">Account</router-link></el-dropdown-item>
              <el-dropdown-item divided @click="logout"
                ><a href="#">Logout</a></el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      username: '',
      isAdmin: false,
    };
  },
  created() {
    this.username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      this.isAdmin = true;
    }
  },
  methods: {
    async logout() {
      console.log('logout')
      try { 
        await this.$store.dispatch('logout');
        this.$router.push({ name: 'Home' });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style lang="scss">
.navbar {
  .container {
    padding: 0rem 0.5rem;
    .navbar-brand {
      margin-right: 0 !important;
      .logo {
        height: 50px;
      }
    }
    .nav-menu {
      display: flex;
      flex-direction: row;
      .el-dropdown {
        cursor: pointer;
        .el-dropdown-link {
          display: flex;
          align-items: center;
          .bi-sliders {
            margin-left: 1rem;
            cursor: pointer;
          }
          .bi-caret-down-fill {
            margin-left: 0.5rem;
            padding-top: 0.5rem;
          }
        }
      }
    }
  }
}

@include bp-up(md) {
  .navbar {
    .container {
      padding: 0rem 0rem;
    }
  }
}
</style>
