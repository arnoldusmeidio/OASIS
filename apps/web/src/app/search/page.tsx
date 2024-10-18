import SearchNavbar from "@/components/header/SearchNavbar";

type Props = {
   searchParams: SearchParams;
};

type SearchParams = {
   searchParams: {
      location: string;
      group_adults: string;
      group_children: string;
      no_rooms: string;
      checkin: string;
      checkout: string;
   };
};

export default function SearchPage({ searchParams }: Props) {
   return (
      <>
         <SearchNavbar />
         <div>SearchPage</div>
      </>
   );
}
