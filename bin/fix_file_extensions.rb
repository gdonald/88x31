#!/usr/bin/env ruby

files = Dir['./*']

files.each do |file|
  skip_exts = %w[rb gif jpg png]
  next if skip_exts.include?(file.split('.')[-1])

  parts = `file #{file}`.split(': ')

  ext = case parts[1]
        when /GIF/  then '.gif'
        when /JPEG/ then '.jpg'
        when /PNG/  then '.png'
        else
          puts "unknown file type: #{parts[1]}"
          nil
        end

  next unless ext

  name = parts[0].delete('./')
  newname = "#{name}#{ext}"

  File.rename(name, newname)
end

