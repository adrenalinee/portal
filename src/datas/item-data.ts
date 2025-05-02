import { Item } from "@/models/item";


export function getItemsData(): Item[] {
  return [
    {
      name: 'google',
      faviconLink: 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
      description: 'centerflow homepage 입니다.',
      repLinkUrl: 'https://www.google.com',
      extraLinks: [
        {
          url: 'https://www.google.com/imghp?hl=ko&ogbl',
          name: 'google 이미지',
          description: '구글 이미지 검색입니다.'
        }
      ],
      tags: [
        { name: 'search' }
      ]
    },
  ]
}






