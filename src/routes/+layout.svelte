<script>
    import Navbar from "../lib/components/Navbar.svelte";
    import SignInModal from "../lib/components/SignInModal.svelte";
    import SignUpModal from "../lib/components/SignUpModal.svelte";
    import Sidebar from "../lib/components/Sidebar.svelte";
</script>

<Navbar />
<!-- <Sidebar /> -->
<SignInModal />
<SignUpModal />
<slot />