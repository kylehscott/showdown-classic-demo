import urllib

card_no = 1

for i in range(1230,1405):
  urllib.urlretrieve("http://www.showdowncards.com/images/product/" + str(i) + ".jpg", str(card_no) + ".jpg")
  print(str(card_no) + ".jpg downloaded.")
  card_no += 1
