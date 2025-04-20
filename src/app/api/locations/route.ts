import { NextResponse } from "next/server";
import { Location } from "@/shared/types/location";

const locations: Location[] = [];
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const location = locations.find((loc) => loc.id === id);
    if (!location) {
      return NextResponse.json({ error: "Location not found." }, { status: 404 });
    }
    return NextResponse.json(location);
  }

  return NextResponse.json(locations);
}

export async function POST(req: Request) {
  const body = await req.json();
  const id = crypto.randomUUID();

  const newLocation: Location = {
    id,
    name: body.name,
    latitude: body.latitude,
    longitude: body.longitude,
    color: body.color,
    icon: body.icon,
  };

  locations.push(newLocation);

  return NextResponse.json(newLocation, { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;

  const index = locations.findIndex((loc) => loc.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Location not found." }, { status: 404 });
  }

  locations[index] = {
    ...locations[index],
    ...updates,
  };

  return NextResponse.json(locations[index], { status: 200 });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  const index = locations.findIndex((loc) => loc.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Location not found." }, { status: 404 });
  }

  const deleted = locations.splice(index, 1)[0];
  return NextResponse.json(deleted, { status: 200 });
}