pocketbase_running=$(ps | grep -i "pocketbase" | wc -m)

if [ $pocketbase_running -gt 0 ]; then
    pkill pocketbase
fi

./server/pocketbase serve &
pnpm dev