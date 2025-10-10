<script lang="ts">
    import { goto } from "$app/navigation";
    import { Card, Button, Label, Input } from "flowbite-svelte";
    import { Badge } from "flowbite-svelte";

    import { create_attender } from "@src/helper_attender.js";
    import {user_phone_number} from "@src/store.js";

    import { toast } from "svelte-sonner";

    // phone as string to allow leading + / 0 etc
    let phone: number;
    let loading: boolean = false;

    async function login(e: SubmitEvent) {
        e?.preventDefault();

        loading = true;

        const json_data = await create_attender(phone);

        if (json_data?.message) {
            toast.success("Registration Success");
            user_phone_number.set(phone)
            await goto("/login");
        } else {
            // show API message or generic error
            toast.error(json_data || "Registration failed");
            loading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <Card class="w-full max-w-md p-10">
        <form class="space-y-4" on:submit={login} aria-busy={loading}>
            <h2 class="text-xl font-semibold text-gray-800 flex justify-center">
                Registration
            </h2>

            <Badge color="indigo">Attender</Badge>

            <div>
                <Label for="phone">Phone</Label>
                <Input
                    id="phone"
                    type="text"
                    bind:value={phone}
                    placeholder="Enter your phone"
                    inputmode="tel"
                    autocomplete="tel"
                />
            </div>

            <div class="flex items-center justify-center">
                <Button
                    type="submit"
                    disabled={loading}
                    aria-disabled={loading}
                    class="min-lg:w-7xl"
                >
                    {#if loading}Verifying...{:else}Register{/if}
                </Button>
            </div>
        </form>
    </Card>
</div>
