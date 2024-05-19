echo "Building App..."
pnpm build
echo "Moving Assets..."
mv ./server/pb_public/client/* ./server/pb_public
echo "Cleanup..."
rm -rf ./server/pb_public/client
echo "Done!"

