module Jekyll
  module StripFirstBrFilter
    def strip_first_br(input)
        firsts = true

        input.gsub! '<br />','<br/>'
        arr = input.split

        arr.each_with_index do |word, i|
            if word == '<br/>' && firsts
                arr[i] = ''
            else
                firsts = false
            end
        end

        arr.join(' ')
    end
  end
end

Liquid::Template.register_filter(Jekyll::StripFirstBrFilter)