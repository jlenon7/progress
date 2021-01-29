for item in `ls`;
do
  echo $item
  cd $item
  npm ci --silent
  cd ..
done