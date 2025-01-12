<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Color } from '$lib/utils/theme';
	import { themeColor } from '$lib/utils/theme';
	import { language } from '$lib';
</script>

<div
	class="w-[300px] md:w-[500px] h-[400px] p-5 rounded-lg overflow-y-auto text-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 {Color(
		$themeColor,
		'bg',
		'50'
	)} {Color($themeColor, 'text', '800')}"
>
	<div class="flex flex-col gap-8">
		<p class="text-xl font-bold">{$language === 'en' ? 'How to Play' : '遊び方'}</p>
		<div class="flex flex-col gap-4">
			<p class="text-xl font-bold">{$language === 'en' ? 'Rules' : 'ルール'}</p>
			<div class="flex flex-col gap-2">
				<p>
					{$language === 'en'
						? 'Sudoku is a number puzzle game. The goal is to fill in the empty cells with numbers from 1 to 9 so that each row, column, and 3x3 block contains all the numbers from 1 to 9 without repeating.'
						: '数独は数字のパズルゲームです。目標は、各行、列、および 3x3 ブロックに1から9までの数字を重複せずにすべて含めるように空のセルを数字で埋めることです。'}
				</p>
				<p>
					{$language === 'en'
						? 'The game starts with a partially filled 9x9 grid. The difficulty of the puzzle depends on the number of cells filled in at the beginning.'
						: 'ゲームは部分的に埋められた 9x9 グリッドで始まります。パズルの難易度は、ステージ選択の際の選択によって決まります。'}
				</p>
				<p>
					{$language === 'en'
						? 'The game is won when all the cells are filled in correctly.'
						: 'すべてのセルが正しく埋められたときにゲームに勝ちます。'}
				</p>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<p class="text-xl font-bold">{$language === 'en' ? 'Game Mode' : 'ゲームモード'}</p>
			<div class="flex flex-col gap-2">
				<p class="font-bold">{$language === 'en' ? 'Sudoku :' : '数独：'}</p>
				<p>
					{$language === 'en'
						? 'Fill in the empty cells with numbers from 1 to 9 so that each row, column, and 3x3 block contains all the numbers from 1 to 9 without repeating.'
						: '空のセルを1から9までの数字で埋めて、各行、列、および 3x3 ブロックに1から9までの数字を重複せずにすべて含めます。'}
				</p>
			</div>
			<div class="flex flex-col gap-2">
				<p class="font-bold">
					{$language === 'en' ? 'Killer (uninstalled) :' : 'キラー (未実装)：'}
				</p>
				<p>
					{$language === 'en'
						? 'Fill in the empty cells with numbers from 1 to 9 so that each row, column, and 3x3 block contains all the numbers from 1 to 9 without repeating.'
						: '空のセルを1から9までの数字で埋めて、各行、列、および 3x3 ブロックに1から9までの数字を重複せずにすべて含めます。'}
				</p>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<p class="text-xl font-bold">{$language === 'en' ? 'Panel UI' : '画面の説明'}</p>
			<div class="flex flex-col gap-2">
				<p class="font-bold">{$language === 'en' ? 'Top Bar :' : '上部バー：'}</p>
				<p>
					{$language === 'en'
						? 'The top bar displays the number of mistakes made, and the timer.'
						: '上部バーには、間違いの回数およびタイマーが表示されます。タイマーを押すことで一時停止をすることができます。'}
				</p>
			</div>
			<div class="flex flex-col gap-2">
				<p class="font-bold">{$language === 'en' ? 'Game Board :' : 'ゲームボード：'}</p>
				<p>
					{$language === 'en'
						? 'The game board is a 9x9 grid where you can fill in the numbers.'
						: 'ゲームボードは、数字を埋めることができる 9x9 グリッドです。セルを押すとそのセルと同じ数字がハイライトされます。'}
				</p>
			</div>
			<div class="flex flex-col gap-2">
				<p class="font-bold">{$language === 'en' ? 'Number Panel :' : '数字パネル：'}</p>
				<p>
					{$language === 'en'
						? 'The number panel is a 3x3 grid where you can select the number to fill in the cells.'
						: '数字パネルは、セルに入力する数字を選択できる 3x3 グリッドです。マルチモードの時は、選択した数字はハイライトされます。'}
				</p>
			</div>
			<div class="flex flex-col gap-2">
				<p class="font-bold flex flex-row gap-2 items-center">
					<Icon icon="lucide:pencil" class="w-4 h-4" />
					<Icon icon="lucide:clipboard-pen" class="w-4 h-4" />
					{$language === 'en' ? 'Mode Selector :' : '入力・メモ：'}
				</p>
				<p>
					{$language === 'en'
						? 'The mode selector is a button that allows you to switch between Sudoku and Killer modes.'
						: '鉛筆アイコンのときは回答、クリップボードアイコンのときはメモをすることができます。'}
				</p>
			</div>
			<div class="flex flex-col gap-2">
				<p class="font-bold flex flex-row gap-2 items-center">
					<Icon icon="lucide:delete" class="w-4 h-4" />
					{$language === 'en' ? 'Undo/Redo :' : '削除：'}
				</p>
				<p>
					{$language === 'en'
						? 'The undo/redo buttons allow you to undo or redo the last action.'
						: '間違えた場合は削除アイコンを押すことでセルから数字を削除できます。'}
				</p>
			</div>
			<div class="flex flex-col gap-2">
				<p class="font-bold flex flex-row gap-2 items-center">
					<Icon icon="lucide:lock" class="w-4 h-4" />
					<Icon icon="lucide:lock-open" class="w-4 h-4" />
					{$language === 'en' ? 'Check :' : 'マルチモード：'}
				</p>
				<p>
					{$language === 'en'
						? 'The check button checks the correctness of the numbers filled in the cells.'
						: 'マルチモードにロックがついていないときは選択したセル二数字が入力されます。ロックがかかっている時はマルチモードとなり、数字パネルの選択された数字で押したセルに数字を埋めます。これは入力・メモ状態のどちらでも有効です。'}
				</p>
			</div>
		</div>
	</div>
</div>
