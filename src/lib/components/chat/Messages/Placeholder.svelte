<script lang="ts">
	import { WEBUI_BASE_URL } from '$lib/constants';
	import { marked } from 'marked';

	import { config, user, models as _models } from '$lib/stores';
	import { onMount, getContext } from 'svelte';

	import { blur, fade } from 'svelte/transition';

	import Suggestions from '../MessageInput/Suggestions.svelte';
	import { sanitizeResponseContent } from '$lib/utils';

	const i18n = getContext('i18n');

	export let modelIds = [];
	export let models = [];

	export let submitPrompt;

	let mounted = false;
	let selectedModelIdx = 0;

	$: if (modelIds.length > 0) {
		selectedModelIdx = models.length - 1;
	}

	$: models = modelIds.map((id) => $_models.find((m) => m.id === id));

	onMount(() => {
		mounted = true;
	});
</script>

{#key mounted}
	<div class="m-auto w-full max-w-6xl px-8 lg:px-24 pb-10">
		<div class="flex justify-start">
			<div class="flex -space-x-4 mb-1" in:fade={{ duration: 200 }}>
				{#each models as model, modelIdx}
					<button
						on:click={() => {
							selectedModelIdx = modelIdx;
						}}
					>
						<img
							crossorigin="anonymous"
							src={model?.info?.meta?.profile_image_url ??
								($i18n.language === 'dg-DG' ? `/doge.png` : `${WEBUI_BASE_URL}/static/favicon.png`)}
							class=" size-[2.7rem] rounded-full border-[1px] border-gray-200 dark:border-none"
							alt="logo"
							draggable="false"
						/>
					</button>
				{/each}
			</div>
		</div>

		<div
			class=" mt-2 mb-4 text-3xl text-gray-800 dark:text-gray-100 font-semibold text-left flex items-center gap-4"
		>
			<div>
				<div class=" capitalize line-clamp-1" in:fade={{ duration: 200 }}>
					{#if models[selectedModelIdx]?.info}
						{models[selectedModelIdx]?.info?.name}
					{:else}
						{$i18n.t('Hello, {{name}}', { name: $user.name })}
					{/if}
				</div>

				<div in:fade={{ duration: 200, delay: 200 }}>
					{#if models[selectedModelIdx]?.info?.meta?.description ?? null}
						<div
							class="mt-0.5 text-base font-normal text-gray-500 dark:text-gray-400 line-clamp-3 markdown"
						>
							{@html marked.parse(
								sanitizeResponseContent(models[selectedModelIdx]?.info?.meta?.description)
							)}
						</div>
						{#if models[selectedModelIdx]?.info?.meta?.user}
							<div class="mt-0.5 text-sm font-normal text-gray-400 dark:text-gray-500">
								By
								{#if models[selectedModelIdx]?.info?.meta?.user.community}
									<a
										href="https://openwebui.com/m/{models[selectedModelIdx]?.info?.meta?.user
											.username}"
										>{models[selectedModelIdx]?.info?.meta?.user.name
											? models[selectedModelIdx]?.info?.meta?.user.name
											: `@${models[selectedModelIdx]?.info?.meta?.user.username}`}</a
									>
								{:else}
									{models[selectedModelIdx]?.info?.meta?.user.name}
								{/if}
							</div>
						{/if}
					{:else}
						<div class="init font-medium text-gray-400 dark:text-gray-500 ">
							<p class="updated-date">Pricing da construtora Construtec com dados atualizados em 17/06 23:59<br>
							<span class="last-change">Última mudança em 02/06 pelo motivo de “aumento da taxa de juros”</span></p>
						{@html marked.parse(`
## Receita x Vendas
- A receita mensal variou entre R$ 6.000.000,00 e R$ 7.000.000,00, acumulando um total de R$ 62.880.000,00 ao longo dos 12 meses. Esta receita foi alcançada com ajustes de preços que, apesar de impactarem negativamente a margem, permitiram manter um volume de vendas alto e constante.

### Positivo
- As vendas do Imóvel 1 mantiveram-se estáveis ao longo dos 12 meses, gerando uma receita total de R$ 9.600.000,00.

### Demanda Atenção
- As vendas do Imóvel 2 apresentaram uma leve queda de 5%, gerando uma receita total de R$ 13.680.000,00 em vez dos esperados R$ 14.400.000,00.

### Demanda Muita Atenção
- As vendas do Imóvel 3 caíram significativamente, com uma variação de -15% em relação ao esperado. A receita gerada foi de R$ 16.320.000,00, comparada com os esperados R$ 19.200.000,00, resultando em uma perda de R$ 2.880.000,00.
- O Imóvel 4 viu um aumento nas vendas de 10%, gerando uma receita total de R$ 22.800.000,00 em vez dos esperados R$ 24.000.000,00. O preço ajustado para R$ 1.900.000,00 (5% de desconto) foi eficaz em aumentar o volume de vendas, mas resultou em uma receita R$ 1.200.000,00 menor do que o potencial sem desconto.
`, {
											gfm: true,
											breaks: true,
										})}

						</div>
					{/if}
				</div>
			</div>
		</div>

		<div class=" w-full" in:fade={{ duration: 200, delay: 300 }}>
			<Suggestions
				suggestionPrompts={$config.default_prompt_suggestions}
				{submitPrompt}
			/>
		</div>
		
	</div>
{/key}
