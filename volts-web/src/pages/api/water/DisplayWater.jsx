import WatterDataTable from "./WatterDataTable"

export default function DisplayWater(){
    return(
    <>
        <div>
            <div>
                <div className="flex flex-col gap-4 w-full max-w-sm mx-auto p-4">
                    <Button className="w-full justify-start">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Water Meter
                    </Button>
                    <Button className="w-full justify-start">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Water Data
                    </Button>
                </div>
            </div>
            <WatterDataTable/>
        </div>
    </>
    )
}