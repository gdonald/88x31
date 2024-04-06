#!/usr/bin/env ruby

img_url = 'https://raw.githubusercontent.com/gdonald/88x31/main/i/'

files = Dir['../i/*'][0..100]

img_tags = files.map do |file|
  "<p><img src='#{img_url}#{File.basename(file)}' /></p>"
end.join("\n")

html = <<~HTML
<!DOCTYPE html>
<html>
<head>
<title>88x31</title>
</head>
<body>
#{img_tags}
</body>
</html>
HTML

File.open('../public/index.html', 'w') { |f| f.write(html) }
