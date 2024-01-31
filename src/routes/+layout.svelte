<script>
    import Navbar from "../lib/components/Navbar.svelte";
    import SignInModal from "../lib/components/SignInModal.svelte";
    import SignUpModal from "../lib/components/SignUpModal.svelte";
</script>

<Navbar />
<SignInModal />
<SignUpModal />
<slot />