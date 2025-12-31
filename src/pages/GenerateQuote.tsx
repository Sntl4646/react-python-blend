import { useState } from "react";
import { Play, Calendar, Check, Info, Plus, ChevronDown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockStations, cloudPackages, tenureOptions } from "@/data/mockData";
import { cn } from "@/lib/utils";

const GenerateQuote = () => {
  const [coTermEnabled, setCoTermEnabled] = useState(true);
  const [targetDate, setTargetDate] = useState("");
  const [activeStation, setActiveStation] = useState("Front Gate");
  const [selectedPackage, setSelectedPackage] = useState(cloudPackages[0].id);
  const [selectedTenure, setSelectedTenure] = useState("1");

  const currentPackage = cloudPackages.find((p) => p.id === selectedPackage);
  const tenureYears = parseInt(selectedTenure);
  const annualPrice = (currentPackage?.monthlyPrice || 0) * 12;
  const stationTotal = annualPrice * tenureYears;
  const grandTotal = stationTotal * mockStations.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 md:px-6 lg:px-8">
        {/* Page Header with Tutorial */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-1">
              Generate Renewal Quote
            </h1>
            <p className="text-muted-foreground">
              Select station and configure subscription packages
            </p>
          </div>

          {/* Tutorial Card */}
          <div className="w-full lg:w-auto">
            <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 min-w-[200px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Play className="h-5 w-5 text-primary fill-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">2:30</p>
                <p className="text-sm font-medium">Renewal Tutorial</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Quote Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Generate a Quote</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Configure your renewal subscription
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Co-term Toggle */}
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          Co-term all stations
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Align all {mockStations.length} stations to a single end date
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={coTermEnabled}
                      onCheckedChange={setCoTermEnabled}
                    />
                  </div>

                  {coTermEnabled && (
                    <div className="mt-4 pt-4 border-t border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Target End Date</span>
                      </div>
                      <Input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="max-w-xs"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        All stations will be aligned to this date. Pro-rated adjustments
                        will be calculated.
                      </p>
                    </div>
                  )}
                </div>

                {/* Station Tabs */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    Configure packages per station
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mockStations.map((station) => (
                      <Button
                        key={station.id}
                        variant={activeStation === station.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveStation(station.name)}
                      >
                        {station.name}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-muted-foreground">
                    <Info className="h-4 w-4" />
                    <span className="text-sm">Configuring packages for {activeStation}</span>
                  </div>
                </div>

                {/* Package Configuration */}
                <div className="rounded-xl border border-border p-4 space-y-4">
                  <h4 className="font-semibold">Package 1</h4>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Subscription
                      </label>
                      <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cloudPackages.map((pkg) => (
                            <SelectItem key={pkg.id} value={pkg.id}>
                              <div className="flex items-center gap-2">
                                <span>{pkg.name}</span>
                                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                                  ${pkg.monthlyPrice.toLocaleString()} /mo
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Tenure
                      </label>
                      <Select value={selectedTenure} onValueChange={setSelectedTenure}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {tenureOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Add Package to {activeStation}
                </Button>

                {/* Cost Breakdown */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Station-wise Cost Breakdown</span>
                  </div>

                  <div className="space-y-3">
                    {mockStations.map((station) => (
                      <div
                        key={station.id}
                        className="flex items-center justify-between py-3 border-b border-border last:border-0"
                      >
                        <div>
                          <p className="font-medium text-foreground">{station.name}</p>
                          <p className="text-sm text-muted-foreground">{station.location.split(",")[0]}</p>
                          <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-xs mt-1">
                            Cloud Package ({tenureYears}Y)
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            $ {stationTotal.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">1 package</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                    <div>
                      <p className="font-semibold text-foreground">Total</p>
                      <p className="text-sm text-muted-foreground">
                        For {mockStations.length} stations
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      $ {grandTotal.toLocaleString()}
                    </p>
                  </div>

                  <Button className="w-full mt-6 gap-2" size="lg">
                    <Check className="h-4 w-4" />
                    Generate Co-term Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Selected Packages */}
          <div className="lg:col-span-1">
            <Card className="animate-slide-up sticky top-24" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle>Selected Packages</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Features of your selected packages
                </p>
              </CardHeader>
              <CardContent>
                {currentPackage && (
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-foreground">
                        Package 1 : Cloud Package
                      </p>
                      <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-xs mt-1">
                        {currentPackage.tier}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">Monthly Price</p>
                        <p className="font-semibold text-foreground">
                          $ {currentPackage.monthlyPrice.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Tenure</p>
                        <p className="font-semibold text-foreground">
                          {selectedTenure} Year
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-3">Features Included</p>
                      <ul className="space-y-2">
                        {currentPackage.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                      <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        Comprehensive features for charging station management
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenerateQuote;
